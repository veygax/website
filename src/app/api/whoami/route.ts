import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface WhoamiRequest {
  args: string[];
}

interface Profile {
  projects: Project[];
  skills: SkillCategory[];
  things_i_like: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

interface SkillCategory {
  category: string;
  items: string[];
}

function readProfileData(): Profile | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'profile.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Profile;
  } catch (error) {
    console.error('Failed to read profile data:', error);
    return null;
  }
}

function formatProjects(projects: Project[]): string {
  let output = "Projects:\n\r";
  
  projects.forEach((project, i) => {
    const projectName = project.url 
      ? `[${project.name}](${project.url})` 
      : project.name;
    
    output += `\n\r${i + 1}. ${projectName} - ${project.description}`;
    output += `\n\r   Technologies: ${project.technologies.join(", ")}`;
  });
  
  return output;
}

function formatSkills(skills: SkillCategory[]): string {
  let output = "Skills:\n\r";
  
  skills.forEach(category => {
    output += `\n\r${category.category}: ${category.items.join(", ")}`;
  });
  
  return output;
}

function formatThingsILike(things: string[]): string {
  let output = "Things I Like:\n\r";
  
  things.forEach((thing, i) => {
    output += `\n\r${i + 1}. ${thing}`;
  });
  
  return output;
}

export async function POST(request: NextRequest) {
  try {
    const requestData: WhoamiRequest = await request.json();
    const args = requestData.args || [];
    
    let output: string;
    
    if (args.length === 0) {
      const profile = readProfileData();
      if (profile) {
        output = "User: veyga\n\r\nDisplay Name: VeygaX\n\r\nShell: /bin/bash\n\r\nRole: Hobbyist Developer\n\r\n";
        output += `${formatProjects(profile.projects)}\n\r\n`;
        output += `${formatSkills(profile.skills)}\n\r\n`;
        output += formatThingsILike(profile.things_i_like);
      } else {
        output = "User: veyga\n\r\nDisplay Name: VeygaX\n\r\nShell: /bin/bash\n\r\nRole: Hobbyist Developer\n\r\nError loading profile data";
      }
    } else if (args.includes('--help') || args.includes('-h')) {
      output = "Usage: whoami [options]\n\r\nOptions:\n\r\n  --help, -h     Display this help message\n\r\n  --version, -v  Display version information\n\r\n --projects, -p Display projects information\n\r\n  --skills, -s   Display skills information\n\r\n  --likes, -l    Display things I like";
    } else if (args.includes('--version') || args.includes('-v')) {
      output = "whoami version 2025";
    } else if (args.includes('--projects') || args.includes('-p')) {
      const profile = readProfileData();
      output = profile ? formatProjects(profile.projects) : "Error loading projects data";
    } else if (args.includes('--skills') || args.includes('-s')) {
      const profile = readProfileData();
      output = profile ? formatSkills(profile.skills) : "Error loading skills data";
    } else if (args.includes('--likes') || args.includes('-l')) {
      const profile = readProfileData();
      output = profile ? formatThingsILike(profile.things_i_like) : "Error loading likes data";
    } else {
      output = `Unknown option: ${args[0]}\n\r\nTry 'whoami --help' for more information.`;
    }
    
    return NextResponse.json({
      output,
      success: true
    });
  } catch (error) {
    return NextResponse.json({
      output: "Error processing command",
      success: false
    });
  }
} 