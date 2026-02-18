# User Workflow: Server File Manager

## Overview
Customer manages their game server files through Pterodactyl's built-in file manager, including uploading, editing, deleting, and creating files and directories.

## Entry Point
- **URL:** https://panel.pocketburrito.ca/server/{server-id}/files
- **From:** "Files" tab in the server management interface

## Prerequisites
- User is logged into https://panel.pocketburrito.ca
- User has a provisioned server
- User (or sub-user) has file manager permissions

## Steps

### 1. Navigate to File Manager
- Open the server from the Pterodactyl dashboard
- Click the "Files" tab in the left sidebar
- The file manager displays the root directory of the server (`/home/container/`)

### 2. Browse Files and Directories
- Files and folders are listed with name, size, and last modified date
- Click a folder to navigate into it
- Use the breadcrumb path at the top to navigate back to parent directories
- The current path is displayed in the URL and breadcrumb trail

### 3. Edit a File
- Click on a text-based file (e.g., `server.properties`, `config.yml`, `.json` files)
- The built-in code editor opens with syntax highlighting
- Make changes in the editor
- Click "Save" to write changes to the file
- Common files to edit:
  - Minecraft: `server.properties`, `bukkit.yml`, `spigot.yml`, plugin configs
  - Valheim: Startup parameters (via Settings tab instead)
  - Rust: `server.cfg`
  - Terraria: `serverconfig.txt`

### 4. Upload Files
- Click the "Upload" button in the top-right area
- Drag and drop files or click to browse local filesystem
- Supported: individual files and `.zip`/`.tar.gz` archives
- Uploads go to the currently viewed directory
- Progress bar shows upload status
- Maximum file size limited by server disk allocation

### 5. Create a New File
- Click "New File" button
- Enter the filename in the editor header
- Write file contents in the editor
- Click "Save" to create the file in the current directory

### 6. Create a New Directory
- Click "Create Directory" button
- Enter the directory name
- New empty directory appears in the file list

### 7. Delete Files or Directories
- Select one or more files/directories using checkboxes
- Click "Delete" button
- Confirm deletion in the dialog
- Deleted files cannot be recovered (unless a backup exists)

### 8. Rename / Move Files
- Click the three-dot menu on a file or folder
- Select "Rename" to change the name
- Enter the new name (can include a path to move the file)

### 9. Compress / Decompress
- Select files and use "Compress" to create a `.tar.gz` archive
- Click a `.tar.gz` or `.zip` archive and select "Decompress" to extract contents

## Error Cases

### File Too Large to Edit
- Very large files (e.g., world data) cannot be opened in the editor
- Binary files display a warning instead of content

### Disk Quota Exceeded
- Upload fails if the file would exceed the server's disk allocation
- Error message indicates insufficient disk space

### Permission Denied
- Sub-users without file permissions see the tab disabled or receive an error
- Certain system files may be read-only

### Upload Timeout
- Large file uploads on slow connections may time out
- Retry the upload or use SFTP for very large files

## Success Criteria
- File manager displays accurate directory listing
- Files can be opened, edited, and saved with changes persisted
- Uploads complete successfully and files appear in the listing
- New files and directories can be created
- Deletion removes files permanently
- Archive compression and decompression work correctly

## Related Workflows
- [07-view-my-servers.md](07-view-my-servers.md)
- [08-server-console.md](08-server-console.md)
- [14-server-backups.md](14-server-backups.md)
- [28-server-reinstall.md](28-server-reinstall.md)

## Test Scenarios
1. **Browse Files:** Open file manager -> Server root directory contents displayed
2. **Edit Config:** Open `server.properties` on Minecraft server -> Edit MOTD -> Save -> Restart server -> MOTD changed
3. **Upload Plugin:** Upload a `.jar` file to the `plugins/` folder -> Restart server -> Plugin loads
4. **Upload and Extract ZIP:** Upload a world `.zip` to root -> Decompress -> World folder appears
5. **Create File:** Create new `whitelist.json` -> Save with content -> File persists
6. **Create Directory:** Create `backups/` directory -> Appears in listing
7. **Delete File:** Delete an unused file -> File removed from listing
8. **Disk Limit:** Upload a file exceeding disk quota -> Error shown
9. **Binary File:** Click a `.jar` file -> Warning or download prompt, not editor
10. **Sub-user Access:** Sub-user with file permissions -> Full file manager access

---
**Status:** Documented | Testing Pending
