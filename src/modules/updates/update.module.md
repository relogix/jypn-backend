# Module - Update

**Update Module** is a module to organize Updates and Posts.

## End-Points

Here some end-points available:

| Name               | URL                     | Method |
| ------------------ | ----------------------- | ------ |
| Search             | `/update/search/`       | GET    |
| Create             | `/update/create/`       | POST   |
| Update Data        | `/update/update-data/`  | PATCH  |
| Change Cover Image | `/update/change-cover/` | PATCH  |
| Delete             | `/update/delete`        | DELETE |

### Search

Get all active updates.

```
GET: /update/search/
```

Here some optional parameter you should try:

| Parameter  | Description                                                                    | Example                            |
| ---------- | ------------------------------------------------------------------------------ | ---------------------------------- |
| `filter`   | Filter updates by _title_ or _content_                                         | `/update/search?filter=some-value` |
| `sortBy`   | Column to be sorted (_see response to get column list_)                        | `/update/search?sortBy=title`      |
| `sortType` | Type of sorting (ASC, DESC). Note: If `sortBy` is empty, `sortType` is ignored | `/update/search?sortType=DESC`     |
| `limit`    | Limit the number of fetched data                                               | `/update/search?limit=10`          |
| `page`     | Data offset relative to `limit` number                                         | `/update/search?page=2`            |

Response:

```
{
    updates: [
        {
            "updateId": "e65c4066-5a05-4a9c-8e83-d924f09d67df", //UUID
            "title": "Title 1",
            "content": "Content 1",
            "createdAt": null,
            "updatedAt": null,
            "isActive": true
        },
    ]
}
```
