import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { Pool } from "pg";
import {
  assets,
  blocks,
  events,
  expressions,
  members,
  pages,
  relations,
  spaces,
  users,
} from "../src/db/schema.js";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({ connectionString });
  const db = drizzle(pool);

  try {
    await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(users)
        .values({
          name: "Demo User",
          email: "demo@example.com",
        })
        .onConflictDoNothing()
        .returning();

      const effectiveUser = user
        ? user
        : await tx
            .select()
            .from(users)
            .where(eq(users.email, "demo@example.com"))
            .then((rows) => rows[0]!);

      const [space] = await tx
        .insert(spaces)
        .values({
          name: "Demo Space",
          visibility: "private",
        })
        .returning();
      if (!space) {
        throw new Error("Failed to insert demo space");
      }

      await tx.insert(members).values({
        spaceId: space.id,
        userId: effectiveUser.id,
        role: "owner",
      });

      const [page] = await tx
        .insert(pages)
        .values({
          spaceId: space.id,
          slug: "welcome",
          title: "Welcome Page",
          summary: "Getting started notes for the demo space.",
          labels: ["intro", "demo"],
          data: { blocks: [] },
          createdBy: effectiveUser.id,
        })
        .returning();
      if (!page) {
        throw new Error("Failed to insert demo page");
      }

      const [expression] = await tx
        .insert(expressions)
        .values({
          pageId: page.id,
          number: 1,
          state: "draft",
          title: "First Expression",
          notes: "Describe the initial idea here.",
          blocksCount: 1,
          data: { version: 1 },
          createdBy: effectiveUser.id,
        })
        .returning();
      if (!expression) {
        throw new Error("Failed to insert demo expression");
      }

      await tx
        .update(pages)
        .set({ primaryExpressionId: expression.id })
        .where(eq(pages.id, page.id));

      await tx.insert(blocks).values({
        expressionId: expression.id,
        type: "text",
        position: 1,
        content: {
          kind: "rich_text",
          text: "This is the first block of the demo expression.",
        },
      });

      const [asset] = await tx
        .insert(assets)
        .values({
          spaceId: space.id,
          kind: "thumbnail",
          mime: "image/png",
          bytes: BigInt(2048),
          hash: "demo-hash",
          url: "https://example.com/demo-thumbnail.png",
        })
        .returning();
      if (!asset) {
        throw new Error("Failed to insert demo asset");
      }

      await tx.insert(relations).values({
        spaceId: space.id,
        subjectId: page.id,
        predicate: "illustrated_by",
        objectId: asset.id,
        weight: 1,
        context: { note: "Thumbnail for the welcome page." },
      });

      await tx.insert(events).values({
        entityType: "page",
        entityId: page.id,
        type: "created",
        payload: {
          by: effectiveUser.id,
          spaceId: space.id,
        },
      });
    });
  } finally {
    await pool.end();
  }

  console.log("Seed data inserted successfully.");
}

main().catch((error) => {
  console.error("Failed to seed database", error);
  process.exit(1);
});
