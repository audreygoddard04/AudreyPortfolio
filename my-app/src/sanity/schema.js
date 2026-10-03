import { defineType, defineField, defineArrayMember } from "sanity";
import { categories } from "../keltner/config";
import { validTravelPath } from "../keltner/seo.mjs";
const required = (rule) => rule.required();
const image = (name) =>
  defineField({
    name,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
        validation: (rule) =>
          rule.custom((value, context) =>
            context.parent?.decorative || value?.trim()
              ? true
              : "Describe the image or mark it decorative.",
          ),
      }),
      defineField({ name: "decorative", type: "boolean", initialValue: false }),
      defineField({ name: "caption", type: "string" }),
      defineField({
        name: "credit",
        title: "Image credit / source",
        type: "string",
      }),
    ],
  });
const slug = defineField({
  name: "slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) =>
    rule
      .required()
      .custom(
        (value) =>
          !value?.current ||
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) ||
          "Use lowercase words separated by hyphens.",
      ),
});
const faqs = defineField({
  name: "faqs",
  title: "FAQ (optional, displayed on the page)",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "question", type: "string", validation: required }),
        defineField({ name: "answer", type: "text", validation: required }),
      ],
    }),
  ],
});
const travelPathValidation = (rule) =>
  rule.custom(
    (value) =>
      !value ||
      validTravelPath(value) ||
      "Use lowercase path segments, e.g. kazakhstan/astana.",
  );
const uniquePath = (rule) =>
  travelPathValidation(rule).custom(async (value, context) => {
    if (!value) return true;
    const id = context.document?._id?.replace(/^drafts\./, "");
    const count = await context
      .getClient({ apiVersion: "2025-02-19" })
      .fetch(
        `count(*[((_type == "destination" && path == $value) || (_type == "article" && travelPath == $value)) && !(_id in [$id, "drafts." + $id])])`,
        { value, id },
      );
    return count === 0 || "This path is already used by another document.";
  });
export const schemaTypes = [
  defineType({
    name: "destination",
    title: "Travel destinations",
    type: "document",
    fields: [
      defineField({ name: "title", type: "string", validation: required }),
      defineField({
        name: "path",
        type: "string",
        description:
          "Path below /keltner/travel, e.g. kazakhstan/astana. Publish ancestor hubs separately. Keep published paths stable.",
        validation: (rule) => uniquePath(rule).required(),
      }),
      defineField({ name: "description", type: "text", validation: required }),
      defineField({
        name: "publishedAt",
        type: "datetime",
        validation: required,
      }),
      faqs,
      defineField({
        name: "relatedDestinations",
        type: "array",
        of: [{ type: "reference", to: [{ type: "destination" }] }],
        validation: (rule) => rule.unique(),
      }),
    ],
  }),
  defineType({
    name: "category",
    title: "Categories",
    type: "document",
    fields: [
      defineField({ name: "title", type: "string", validation: required }),
      defineField({
        name: "slug",
        type: "slug",
        options: { source: "title" },
        validation: (rule) =>
          rule
            .required()
            .custom(
              (value) =>
                !value?.current ||
                categories.some(
                  (c) =>
                    c.slug === value.current ||
                    c.aliases?.includes(value.current),
                ) ||
                "Use style, places, travel, the-home, music, or culture. Legacy section slugs are also supported.",
            ),
      }),
    ],
  }),
  defineType({
    name: "product",
    title: "Products",
    type: "document",
    fields: [
      defineField({ name: "name", type: "string", validation: required }),
      defineField({ name: "brand", type: "string", validation: required }),
      defineField({ name: "description", type: "text", rows: 3 }),
      image("image"),
      defineField({ name: "retailer", type: "string", validation: required }),
      defineField({
        name: "url",
        title: "Retailer or affiliate URL",
        type: "url",
        validation: (rule) => rule.required().uri({ scheme: ["https"] }),
      }),
      defineField({
        name: "isAffiliate",
        title: "This is an affiliate link",
        type: "boolean",
        initialValue: false,
      }),
      defineField({
        name: "price",
        title: "Price when checked (optional)",
        type: "number",
        validation: (rule) => rule.min(0),
      }),
      defineField({
        name: "currency",
        type: "string",
        options: { list: ["USD", "CAD", "GBP", "EUR"] },
        initialValue: "USD",
      }),
      defineField({
        name: "priceCheckedAt",
        title: "Date the price was checked",
        type: "date",
        validation: (rule) =>
          rule.custom((value, context) =>
            context.document?.price != null && !value
              ? "Add the date you verified this price."
              : true,
          ),
      }),
    ],
    preview: { select: { title: "name", subtitle: "brand", media: "image" } },
  }),
  defineType({
    name: "article",
    title: "Articles",
    type: "document",
    initialValue: () => ({
      author: "Audrey Goddard",
      publishedAt: new Date().toISOString(),
    }),
    fields: [
      defineField({ name: "title", type: "string", validation: required }),
      slug,
      defineField({
        name: "featured",
        title: "Feature on the KELTNER cover",
        type: "boolean",
        initialValue: false,
        description:
          "Replaces the Lake Como introduction with this story. Requires a hero image. If several stories are selected, the newest published story is used.",
      }),
      defineField({
        name: "excerpt",
        type: "text",
        rows: 3,
        validation: (rule) => rule.required().max(240),
      }),
      defineField({ name: "author", type: "string", validation: required }),
      defineField({
        name: "category",
        type: "reference",
        to: [{ type: "category" }],
        validation: required,
      }),
      defineField({
        name: "publishedAt",
        title: "Publication date",
        description:
          "Only published documents with a date at or before now appear on the website.",
        type: "datetime",
        validation: required,
      }),
      defineField({
        name: "updatedAt",
        title: "Editorially updated (optional)",
        type: "datetime",
        description:
          "Set only after a meaningful content update; shown to readers.",
        validation: (rule) =>
          rule.custom(
            (value, context) =>
              !value ||
              (new Date(value) >= new Date(context.document?.publishedAt) &&
                new Date(value) <= new Date()) ||
              "Use a date between publication and today.",
          ),
      }),
      defineField({
        name: "summary",
        title: "Concise answer / summary (optional)",
        type: "text",
        rows: 3,
      }),
      defineField({
        name: "quickGuide",
        type: "object",
        fields: [
          "bestFor",
          "location",
          "whenToGo",
          "priceRange",
          "idealStay",
          "keltnerPick",
        ].map((name) => defineField({ name, type: "string" })),
      }),
      faqs,
      defineField({
        name: "guideType",
        type: "string",
        options: {
          list: [
            "guide",
            "hotels",
            "cafes",
            "restaurants",
            "itinerary",
            "packing",
            "style",
            "sourcebook",
          ],
        },
      }),
      defineField({
        name: "destination",
        type: "reference",
        to: [{ type: "destination" }],
      }),
      defineField({
        name: "travelPath",
        type: "string",
        description:
          "Optional travel alias, e.g. kazakhstan/astana/hotels. Redirects to the existing article URL; do not reuse a destination path.",
        validation: uniquePath,
      }),
      defineField({
        name: "topics", title: "Topic clusters", type: "array",
        of: [{ type: "string" }], options: { layout: "tags" },
        description: "Reuse precise topics such as grand-hotels, timeless-wardrobe, or historic-houses. Shared topics connect related stories automatically.",
        validation: (rule) => rule.unique(),
      }),
      defineField({
        name: "relatedArticles", title: "Related articles", type: "array",
        of: [{ type: "reference", to: [{ type: "article" }] }],
        description: "Choose 2–4 closely related published stories when available. These connections also appear back on the linked stories. Never add unrelated links just to reach a count.",
        validation: (rule) => rule.unique().max(4),
      }),
      defineField({
        name: "isCommercialGuide", title: "Commercial guide", type: "boolean", initialValue: false,
        description: "Mark buying, booking, or sourcebook guides eligible for relevant recommendations.",
      }),
      defineField({
        name: "commercialGuide", title: "Relevant commercial guide", type: "reference", to: [{ type: "article" }],
        description: "One useful published buying or booking guide. Leave blank if none exists yet.",
      }),
      defineField({
        name: "pillarArticle", title: "Broader pillar article", type: "reference", to: [{ type: "article" }],
        description: "Optional broader published guide. Every article also links back to its section hub.",
      }),
      defineField({
        name: "relatedGuides",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "article" }],
            options: {
              filter: ({ document }) => ({
                filter: '!(_id in [$id, "drafts." + $id])',
                params: { id: document._id.replace(/^drafts\./, "") },
              }),
            },
          },
        ],
        validation: (rule) => rule.unique(),
      }),
      image("heroImage"),
      defineField({
        name: "body",
        type: "array",
        validation: (rule) => rule.required().min(1),
        of: [
          defineArrayMember({
            type: "block",
            styles: [
              { title: "Normal", value: "normal" },
              { title: "Heading", value: "h2" },
              { title: "Subheading", value: "h3" },
              { title: "Quote", value: "blockquote" },
            ],
            marks: {
              decorators: [
                { title: "Bold", value: "strong" },
                { title: "Italic", value: "em" },
              ],
              annotations: [
                {
                  name: "link",
                  type: "object",
                  fields: [
                    {
                      name: "href",
                      type: "url",
                      validation: (rule) =>
                        rule.required().uri({ scheme: ["https", "http"] }),
                    },
                    {
                      name: "isAffiliate",
                      title: "Affiliate link",
                      type: "boolean",
                      initialValue: false,
                    },
                  ],
                },
              ],
            },
          }),
          defineArrayMember({
            type: "image",
            fields: [
              {
                name: "alt",
                type: "string",
                validation: (rule) =>
                  rule.custom((value, context) =>
                    context.parent?.decorative || value?.trim()
                      ? true
                      : "Describe the image or mark it decorative.",
                  ),
              },
              { name: "decorative", type: "boolean", initialValue: false },
              { name: "caption", type: "string" },
              { name: "credit", type: "string" },
            ],
          }),
        ],
      }),
      defineField({
        name: "products",
        type: "array",
        of: [{ type: "reference", to: [{ type: "product" }] }],
        validation: (rule) => rule.unique(),
      }),
      defineField({
        name: "seoTitle",
        title: "Search title (optional)",
        type: "string",
        validation: (rule) => rule.max(70),
      }),
      defineField({
        name: "seoDescription",
        title: "Search description (optional)",
        type: "text",
        rows: 2,
        validation: (rule) => rule.max(170),
      }),
    ],
    preview: {
      select: { title: "title", subtitle: "author", media: "heroImage" },
    },
  }),
];
