#!/bin/bash

# Script to setup Figma MCP server for Claude Code
# Usage: ./scripts/setup-figma-mcp.sh

set -e

echo "🔧 Setting up Figma MCP server for Claude Code..."

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     CONFIG_PATH="$HOME/.claude.json";;
    Darwin*)    CONFIG_PATH="$HOME/.claude.json";;
    *)          echo "❌ Unsupported OS: ${OS}"; exit 1;;
esac

echo "📁 Config file location: $CONFIG_PATH"

# Backup existing config if it exists
if [ -f "$CONFIG_PATH" ]; then
    echo "💾 Backing up existing config to ${CONFIG_PATH}.backup"
    cp "$CONFIG_PATH" "${CONFIG_PATH}.backup"
fi

# Create or update config
if [ -f "$CONFIG_PATH" ]; then
    # Config exists, merge with existing
    echo "📝 Updating existing config..."

    # Check if jq is installed
    if ! command -v jq &> /dev/null; then
        echo "⚠️  jq is not installed. Please add Figma MCP manually to $CONFIG_PATH"
        echo "Add this configuration:"
        cat <<EOF
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "transport": "http"
    }
  }
}
EOF
        exit 1
    fi

    # Merge configurations
    jq '.mcpServers.figma = {"url": "https://mcp.figma.com/mcp", "transport": "http"}' "$CONFIG_PATH" > "${CONFIG_PATH}.tmp"
    mv "${CONFIG_PATH}.tmp" "$CONFIG_PATH"
else
    # Create new config
    echo "📝 Creating new config file..."
    cat > "$CONFIG_PATH" <<EOF
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "transport": "http"
    }
  }
}
EOF
fi

echo "✅ Figma MCP server configured successfully!"
echo ""
echo "📋 Current configuration:"
cat "$CONFIG_PATH"
echo ""
echo "🔄 Please restart Claude Code for changes to take effect"
echo ""
echo "🧪 To verify the setup, use: claude mcp list"
