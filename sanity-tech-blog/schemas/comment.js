export default {
    name: "comment",
    type: "document",
    title: "Comment",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
      },
      {
        name: "approved",
        title: "Onayla",
        type: "boolean",
        description: "Yorumu yayınla",
      },
      {
        name: "email",
        type: "string",
      },
      {
        name: "comment",
        type: "text",
      },
      {
        name: "post",
        type: "reference",
        to: [{ type: "post" }],
      },
    ],
  };