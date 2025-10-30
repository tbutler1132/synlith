import { sql } from "drizzle-orm";
import {
  bigint,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const spaces = pgTable("spaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  visibility: varchar("visibility", { length: 32 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const members = pgTable(
  "members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    spaceId: uuid("space_id")
      .notNull()
      .references(() => spaces.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 64 }).notNull(),
  },
  (table) => ({
    spaceUserUnique: uniqueIndex("members_space_id_user_id_key").on(
      table.spaceId,
      table.userId,
    ),
  }),
);

export const pages = pgTable(
  "pages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    spaceId: uuid("space_id")
      .notNull()
      .references(() => spaces.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 255 }).notNull(),
    title: text("title").notNull(),
    summary: text("summary"),
    labels: text("labels").array().default(sql`'{}'::text[]`).notNull(),
    primaryExpressionId: uuid("primary_expression_id"),
    data: jsonb("data"),
    createdBy: uuid("created_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    spaceSlugUnique: uniqueIndex("pages_space_id_slug_key").on(table.spaceId, table.slug),
  }),
);

export const expressions = pgTable(
  "expressions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    pageId: uuid("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    number: integer("number").notNull(),
    state: varchar("state", { length: 32 }).notNull(),
    title: text("title").notNull(),
    notes: text("notes"),
    blocksCount: integer("blocks_count").default(0).notNull(),
    data: jsonb("data"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdBy: uuid("created_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    pageNumberUnique: uniqueIndex("expressions_page_id_number_key").on(
      table.pageId,
      table.number,
    ),
  }),
);

export const blocks = pgTable(
  "blocks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    expressionId: uuid("expression_id")
      .notNull()
      .references(() => expressions.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 64 }).notNull(),
    position: integer("position").notNull(),
    content: jsonb("content"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    expressionPositionUnique: uniqueIndex("blocks_expression_id_position_key").on(
      table.expressionId,
      table.position,
    ),
  }),
);

export const relations = pgTable("relations", {
  id: uuid("id").defaultRandom().primaryKey(),
  spaceId: uuid("space_id")
    .notNull()
    .references(() => spaces.id, { onDelete: "cascade" }),
  subjectId: uuid("subject_id").notNull(),
  predicate: varchar("predicate", { length: 64 }).notNull(),
  objectId: uuid("object_id").notNull(),
  weight: integer("weight"),
  context: jsonb("context"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const assets = pgTable("assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  spaceId: uuid("space_id")
    .notNull()
    .references(() => spaces.id, { onDelete: "cascade" }),
  kind: varchar("kind", { length: 64 }).notNull(),
  mime: varchar("mime", { length: 128 }).notNull(),
  bytes: bigint("bytes", { mode: "bigint" }).notNull(),
  hash: varchar("hash", { length: 128 }).notNull(),
  url: text("url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  entityType: varchar("entity_type", { length: 64 }).notNull(),
  entityId: uuid("entity_id").notNull(),
  type: varchar("type", { length: 64 }).notNull(),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
