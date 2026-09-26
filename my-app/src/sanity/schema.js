import { defineType, defineField, defineArrayMember } from "sanity";
import { categories } from "../keltner/config";
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
        validation: required,
      }),
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
export const schemaTypes = [
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
                "Use style, places, cars, or travel. Existing estates and motoring slugs are also supported.",
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
              { name: "alt", type: "string", validation: required },
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
