# Universal Data Tool to LabelMe Converter

Convert UDT Files into LabelMe files and vice versa. This is helpful if you're using the [Universal Data Tool](https://universaldatatool.com) for labeling files and need to convert to labelme to work with other programs,
or vice versa.

# Getting Started

You use `udt-labelme-converter` directly with `npx` without global installation.

```bash
# Convert a UDT file into a LabelMe directory
npx udt-labelme-converter --input=my-udt-file.udt.json --output=labelme-files

# Convert a LabelMe directory into a UDT file
npx udt-labelme-converter --input=labelme-files --output=my-udt-file.udt.json
```

To see more information about how [LabelMe formats files, check out the wiki page](https://github.com/UniversalDataTool/udt-labelme-converter/wiki/LabelMe-Format)
