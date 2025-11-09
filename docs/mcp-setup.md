# MCP Server Setup Guide

This guide explains how to set up Model Context Protocol (MCP) servers for Claude Code, specifically for accessing Figma designs.

## What is MCP?

Model Context Protocol (MCP) allows Claude Code to connect to external services and tools, extending its capabilities beyond the built-in features.

## Setting up Figma MCP Server

### Quick Setup (Using Script)

Run the provided setup script:

```bash
./scripts/setup-figma-mcp.sh
```

This will automatically configure the Figma MCP server in your Claude Code configuration.

### Manual Setup

#### Option 1: Using CLI

```bash
# Add Figma MCP server
claude mcp add figma --scope user --url https://mcp.figma.com/mcp

# Verify installation
claude mcp list

# Test the connection
claude mcp get figma
```

#### Option 2: Edit Configuration File

1. **Locate your Claude Code configuration file:**

   - **macOS/Linux:** `~/.claude.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add the Figma MCP configuration:**

   ```json
   {
     "mcpServers": {
       "figma": {
         "url": "https://mcp.figma.com/mcp",
         "transport": "http"
       }
     }
   }
   ```

3. **Restart Claude Code**

## Configuration File Structure

### Single MCP Server

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "transport": "http"
    }
  }
}
```

### Multiple MCP Servers

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "transport": "stdio",
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    },
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "transport": "http"
    },
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-perplexity"],
      "transport": "stdio",
      "env": {
        "PERPLEXITY_API_KEY": "your-api-key"
      }
    }
  }
}
```

## MCP Server Scopes

MCP servers can be configured at different scope levels:

### User Scope (Recommended)
- **Location:** `~/.claude.json`
- **Use case:** Personal tooling that you want available across all projects
- **Command:** `claude mcp add <name> --scope user`

### Project Scope
- **Location:** `<project-root>/.claude.json`
- **Use case:** Project-specific tools
- **Command:** `claude mcp add <name> --scope project`

### Workspace Scope
- **Location:** Workspace configuration
- **Use case:** Team-wide tools
- **Command:** `claude mcp add <name> --scope workspace`

## Transport Types

### HTTP Transport (Recommended for Remote Servers)
```json
{
  "url": "https://mcp.figma.com/mcp",
  "transport": "http"
}
```

### Stdio Transport (For Local Processes)
```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "transport": "stdio"
}
```

## Using Figma MCP in This Project

Once configured, Claude Code will have access to tools that start with `mcp__figma__*`. For example:

- `mcp__figma__get_file` - Get Figma file content
- `mcp__figma__get_images` - Export images from Figma
- `mcp__figma__get_components` - Get component definitions

### Example Usage

After setup, you can reference Figma designs directly:

```
User: Look at this Figma design: https://www.figma.com/design/IM3NUKPryxNiT4idFZ7YA0/ATS?node-id=43-17391

Claude: [Uses mcp__figma__get_file to fetch the design and analyze components]
```

### Benefits for This Project

With Figma MCP configured:

1. **Direct Design Access** - Claude can read Figma designs and extract:
   - Component hierarchies
   - Design tokens (colors, spacing, typography)
   - Layout information
   - Text content

2. **Automated Code Generation** - Generate React components based on Figma designs:
   ```bash
   User: Generate a React component based on this Figma frame
   Claude: [Analyzes design and generates component code]
   ```

3. **Design-Code Consistency** - Ensure implementation matches designs:
   ```bash
   User: Compare my Button component with the Figma design
   Claude: [Compares and highlights differences]
   ```

## Troubleshooting

### MCP Server Not Found

If Claude Code can't find the MCP server:

1. Check configuration file location:
   ```bash
   cat ~/.claude.json
   ```

2. Verify JSON syntax:
   ```bash
   # Install jq if not available
   brew install jq  # macOS
   apt install jq   # Linux

   # Validate JSON
   jq . ~/.claude.json
   ```

3. Restart Claude Code

### Permission Issues

If you get permission errors:

```bash
# Fix file permissions
chmod 644 ~/.claude.json
```

### Connection Issues

If Figma MCP can't connect:

1. Check internet connection
2. Verify Figma MCP service is running: `curl https://mcp.figma.com/mcp`
3. Check firewall settings

### Clearing MCP Configuration

To remove all MCP servers:

```bash
# Backup current config
cp ~/.claude.json ~/.claude.json.backup

# Remove specific server
claude mcp remove figma

# Or manually edit the file
nano ~/.claude.json
```

## Verifying Setup

After configuration, verify the setup:

```bash
# List all configured MCP servers
claude mcp list

# Expected output should include:
# - figma (https://mcp.figma.com/mcp)

# Test the Figma MCP server
claude mcp get figma
```

In Claude Code, check for available Figma tools:
- Look for tools starting with `mcp__figma__*` in the tool list
- Try accessing a Figma file to verify functionality

## Additional MCP Servers

You might also want to configure other useful MCP servers:

### GitHub (for PR management)
```bash
claude mcp add github --scope user
```

### Perplexity (for research)
```bash
claude mcp add perplexity --scope user
```

### Sequential Thinking (for complex tasks)
```bash
claude mcp add sequential-thinking --scope user
```

## Resources

- [Claude Code MCP Documentation](https://docs.claude.com/en/docs/claude-code/mcp)
- [MCP Server Registry](https://mcpcat.io)
- [Figma MCP Server](https://mcp.figma.com)

## Support

If you encounter issues:

1. Check the [Claude Code Issues](https://github.com/anthropics/claude-code/issues)
2. Review [MCP Setup Guide](https://mcpcat.io/guides/adding-an-mcp-server-to-claude-code/)
3. Ask in Claude Code community forums