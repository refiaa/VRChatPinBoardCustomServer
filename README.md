
*MongoDB想定*

## Local環境テスト方法

https://booth.pm/ja/items/5950794

スクリプト`./Scripts/PinboardIdGenerator/PinboardIdGenerator.cs`の


```cs
        private string noteDownloadBaseURL = "https://getnotesv3-klg7bavjoq-uc.a.run.app";
        private string noteUploadBaseURL = "https://addnotev3-klg7bavjoq-uc.a.run.app";
        private string pinboardCreateBaseURL = "https://addpinboardv3-klg7bavjoq-uc.a.run.app";
```

を

```cs
        private string noteDownloadBaseURL = "http://localhost:3000/getnotesv3";
        private string noteUploadBaseURL   = "http://localhost:3000/addnotev3";
        private string pinboardCreateBaseURL = "http://localhost:3000/addpinboardv3";
```

にしてください。


---

### GET /getnotesv3

Required Params

- pinboardID : `string`

**using example**

- GET /getnotesv3?pinboardId=7ab2c4d5e6f8g

---

### GET /addpinboardv3

Required Params

- pinboardId: `string` (14 characters, alphanumeric)
- hashKey: `string` (32 characters, alphanumeric)

**using example**

- GET /addpinboardv3?pinboardId=7ab2c4d5e6f8g&hashKey=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6


---

### GET /addnotev3

Required Params

- pinboardId: `string`
- localPosition: `string` (format: "x,y")
- angle: `string` (rotation degree)
- colorHue: `string` (0-1 float)
- content: `string` (note text)
- userHash: `string` (MD5 hash of username+hashKey)
- hash: `string` (MD5 hash of all parameters)

**using example**

- GET /addnotev3?pinboardId=7ab2c4d5e6f8g&localPosition=1,1&angle=45&colorHue=0.7&content=TestNote&userHash=abc123&hash=md5hash

