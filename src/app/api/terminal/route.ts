import { NextRequest, NextResponse } from 'next/server';

interface CommandRequest {
  command: string;
}

interface CommandResponse {
  output: string;
  success: boolean;
}

function getHelpText(): string {
  let output = "backend command usage:\n";
  output += "\r\nbackend help    - show this help message\n";
  output += "\r\nbackend ping    - check connection\n";
  return output;
}

function handleRustBackendCommand(command: string): CommandResponse {
  const parts = command.split(/\s+/);
  
  // Just backend without subcommands
  if (parts.length === 1) {
    return {
      output: getHelpText(),
      success: true
    };
  }
  
  const subcommand = parts[1];
  switch (subcommand) {
    case "help":
      return {
        output: getHelpText(),
        success: true
      };
    case "ping":
      return {
        output: "pong",
        success: true
      };
    default:
      return {
        output: `Unknown subcommand: ${subcommand}`,
        success: false
      };
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData: CommandRequest = await request.json();
    
    if (!requestData.command) {
      return NextResponse.json({
        output: "Invalid request body",
        success: false
      });
    }

    const command = requestData.command.trim().toLowerCase();
    
    // Handle backend command with subcommands
    if (command.startsWith("backend")) {
      const response = handleRustBackendCommand(command);
      return NextResponse.json(response);
    } else {
      return NextResponse.json({
        output: `Unknown command: ${command}`,
        success: false
      });
    }
  } catch (error) {
    return NextResponse.json({
      output: "Error processing command",
      success: false
    });
  }
} 