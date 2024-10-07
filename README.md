## Check for docker tag existence

## inputs
| Field           | Required | Description                                                |
| --------------- | -------- | ---------------------------------------------------------- |
| files           | yes      | File names need to compute checksum                        |
| files_separator | no       | Separator used to split the `files` input. Default is '\n' |

## outputs
| Field    | Description               |
| -------- | ------------------------- |
| sha256   | Full sha256 hash          |
| short256 | First 6 character of hash |
