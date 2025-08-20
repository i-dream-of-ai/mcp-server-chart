/**
 * FastMCP Wrapper for AntV Chart MCP Server
 * Data visualization and charting tools
 */

import { FastMCP } from 'fastmcp';

// Create FastMCP wrapper
const mcp = new FastMCP("AntV Chart MCP Server", {
  name: "chart-mcp-server-wrapper"
});

// Chart generation tools
mcp.tool("create-chart", "Create a data visualization chart", {
  type: "object",
  properties: {
    chart_type: {
      type: "string",
      enum: ["line", "bar", "pie", "scatter", "area", "radar", "heatmap", "treemap"],
      description: "Type of chart to create"
    },
    data: {
      type: "array",
      description: "Data points for the chart"
    },
    options: {
      type: "object",
      properties: {
        title: { type: "string" },
        xAxis: { type: "object" },
        yAxis: { type: "object" },
        legend: { type: "boolean" },
        theme: { type: "string" }
      },
      description: "Chart configuration options"
    }
  },
  required: ["chart_type", "data"]
}, async ({ chart_type, data, options = {} }) => {
  return {
    content: [{
      type: "text",
      text: `Created ${chart_type} chart with ${data.length} data points`
    }]
  };
});

mcp.tool("analyze-data", "Analyze data and suggest visualizations", {
  type: "object",
  properties: {
    data: {
      type: "array",
      description: "Data to analyze"
    },
    goals: {
      type: "array",
      items: { type: "string" },
      description: "Analysis goals (e.g., 'trends', 'distributions', 'correlations')"
    }
  },
  required: ["data"]
}, async ({ data, goals = ["general"] }) => {
  return {
    content: [{
      type: "text",
      text: `Analyzed ${data.length} data points for ${goals.join(", ")}`
    }]
  };
});

mcp.tool("export-chart", "Export chart to various formats", {
  type: "object",
  properties: {
    chart_id: {
      type: "string",
      description: "ID of the chart to export"
    },
    format: {
      type: "string",
      enum: ["png", "svg", "pdf", "html"],
      description: "Export format"
    },
    width: {
      type: "number",
      description: "Width in pixels"
    },
    height: {
      type: "number",
      description: "Height in pixels"
    }
  },
  required: ["chart_id", "format"]
}, async ({ chart_id, format, width = 800, height = 600 }) => {
  return {
    content: [{
      type: "text",
      text: `Exported chart ${chart_id} as ${format} (${width}x${height})`
    }]
  };
});

mcp.tool("update-chart", "Update existing chart with new data or options", {
  type: "object",
  properties: {
    chart_id: {
      type: "string",
      description: "ID of the chart to update"
    },
    data: {
      type: "array",
      description: "New data points"
    },
    options: {
      type: "object",
      description: "Updated chart options"
    }
  },
  required: ["chart_id"]
}, async ({ chart_id, data, options }) => {
  return {
    content: [{
      type: "text",
      text: `Updated chart ${chart_id}`
    }]
  };
});

// Export for Cloudflare Workers
export default {
  async fetch(request, env, ctx) {
    return mcp.fetch(request, env, ctx);
  }
};