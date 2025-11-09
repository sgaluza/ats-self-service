# Scripts

This directory contains utility scripts for the ATS Self-Service Platform.

## Available Scripts

### setup-figma-mcp.sh

Automatically configures the Figma MCP server for Claude Code.

**Usage:**
```bash
./scripts/setup-figma-mcp.sh
```

**What it does:**
- Detects your operating system
- Locates the Claude Code configuration file
- Backs up existing configuration
- Adds or updates Figma MCP server configuration
- Provides verification instructions

**Requirements:**
- `jq` (optional, for merging with existing config)
- Claude Code installed

**Example output:**
```
🔧 Setting up Figma MCP server for Claude Code...
📁 Config file location: /home/user/.claude.json
💾 Backing up existing config to /home/user/.claude.json.backup
📝 Updating existing config...
✅ Figma MCP server configured successfully!

📋 Current configuration:
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "transport": "http"
    }
  }
}

🔄 Please restart Claude Code for changes to take effect
🧪 To verify the setup, use: claude mcp list
```

## Future Scripts

Additional utility scripts will be added here:
- Database migration scripts
- Deployment automation
- Development environment setup
- WireGuard configuration generators
