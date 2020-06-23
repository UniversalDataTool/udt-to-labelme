# Run script
`npx udt-labelme-converter convert -- --input=my-precious-samples.json --output=output`

# Example Labelme Format

```json
{
    "version": "4.5.0",
    "flags": "",
    "shapes": {
        "label": "undefined",
        "points": [
            ["x", "y"],
            ["x", "y"],
            ["x", "y"],
            ["x", "y"]
        ],
        "shape_type": "polygon",
        "group_id": null,
        "flags": {}
    },
    "imagePath": "",
    "imageData": "",
    "imageHeight": "",
    "imageWidth": ""
}
```
* version:
    * It gives an information about Labelme version.
* flags:
  * Flags for label.
* shapes:
  * label:
    * It contains string label
  * points:
    * It's an array of points which contains x and y
  * shape_type:
    * It defines type of shape you made on image.
  * group_id:
    * Every label group has their unique color. This is for specifying label group. 
  * flags:
    * It's an flags object.
* imagePath:
  * It's file path of image used for labelling.
* imageData:
  * It's base64 version of image used for labelling.
* imageHeight:
  * It's exact height of image used for labelling.
* imageWidth:
  * It's exact width of image used for labelling.