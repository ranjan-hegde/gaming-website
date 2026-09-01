from fpdf import FPDF, XPos, YPos

class Resume(FPDF):
    def header(self):
        # Name and Contact
        self.set_font('Helvetica', 'B', 24)
        self.cell(0, 10, 'INDRAJ A G', new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
        
        self.set_font('Helvetica', 'B', 12)
        self.cell(0, 8, 'Game Developer', new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
        
        self.set_font('Helvetica', '', 10)
        self.cell(0, 5, 'Email: indrajag2005@gmail.com', new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
        self.cell(0, 5, 'LinkedIn: linkedin.com/in/indraj-a-g-6701b4342  |  GitHub: github.com/Indraj-2005', new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
        self.ln(5)

    def section_title(self, title):
        self.set_font('Helvetica', 'B', 14)
        self.set_fill_color(230, 230, 230)
        self.cell(0, 8, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT, fill=True)
        self.ln(2)

    def item(self, title, subtitle, bullets):
        title = title.replace('—', '-').replace('·', '-')
        subtitle = subtitle.replace('—', '-').replace('·', '-')
        
        self.set_font('Helvetica', 'B', 12)
        self.cell(0, 6, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_font('Helvetica', 'I', 11)
        self.cell(0, 6, subtitle, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_font('Helvetica', '', 10)
        for bullet in bullets:
            bullet = bullet.replace('—', '-').replace('·', '-')
            self.multi_cell(0, 5, "- " + bullet, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(3)

pdf = Resume()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)

# SUMMARY
pdf.section_title('SUMMARY')
pdf.set_font('Helvetica', '', 10)
pdf.multi_cell(0, 5, "Passionate game developer with 2 years of hands-on experience designing and programming 2D and 3D games. Strong foundation in core game logic, system architecture, and performance optimization across multiple engines including Unity, Godot, and Unreal Engine. Skilled in crafting immersive interactive experiences, fluid gameplay mechanics, and scalable codebases.", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
pdf.ln(5)

# GAME PROJECTS
pdf.section_title('GAME PROJECTS')

pdf.item('PolyRace - 3D Racing Game', 'Unity - In Development', [
    'High-speed low-poly racing game for PC',
    'Built custom hovercraft physics supporting 600+ km/h with smooth camera interpolation',
    'Designed low-poly desert canyon environments with dynamic lighting and atmospheric fog',
    'Implemented full settings system - audio, video, resolution, localization, and quality controls',
    'Created training mode with vehicle selection, track selection, and time attack race type'
])

pdf.item('Fire-Hits - 2D Action-Defense', 'Unity - 1 Month', [
    'Skeleton-slaying action game for Android',
    'Developed enemy wave spawning system with directional spawn points and difficulty scaling',
    'Implemented real-time sword combat with hit detection, kill tracking, and survival timer',
    'Built complete UI/HUD system with pause, resume, main menu, and game over screens'
])

pdf.item('Pirates Maker - 2D Platformer', 'Python / Pygame - 1 Month', [
    'Pirate-themed platformer with world map for Android',
    'Built custom game engine from scratch using Pygame - game loop, collision, sprite management',
    'Designed 6 handcrafted levels connected via a node-based world map with progression tracking',
    'Implemented sword combat, timer-based scoring, and game over stats system'
])

pdf.item('Kero Bot - 2D Platformer', 'Godot - 1 Month', [
    'Pixel-art frog robot platformer for Android',
    'Designed multi-level progression with themed environments (grass, caves, twilight)',
    'Implemented responsive touch controls, cherry collectibles, enemy AI, and health system',
    'Built pause menu, scoring system, and level completion with trophy markers'
])

# SKILLS
pdf.section_title('SKILLS')
pdf.set_font('Helvetica', 'B', 10)
pdf.cell(35, 6, 'Game Engines:')
pdf.set_font('Helvetica', '', 10)
pdf.cell(0, 6, 'Unity (C#), Godot (GDScript), Unreal Engine (C++/Blueprint)', new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.set_font('Helvetica', 'B', 10)
pdf.cell(35, 6, 'Programming:')
pdf.set_font('Helvetica', '', 10)
pdf.cell(0, 6, 'Python, C#, C++, GDScript', new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.set_font('Helvetica', 'B', 10)
pdf.cell(35, 6, 'Game Dev:')
pdf.set_font('Helvetica', '', 10)
pdf.cell(0, 6, 'Gameplay Mechanics, Level Design, Game UI/UX, Performance Optimization', new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.set_font('Helvetica', 'B', 10)
pdf.cell(35, 6, 'Tools & Tech:')
pdf.set_font('Helvetica', '', 10)
pdf.cell(0, 6, 'Git & Version Control, Blender, Game Physics, UI/UX Design, Android Development', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
pdf.ln(5)

# EDUCATION
pdf.section_title('EDUCATION')
pdf.set_font('Helvetica', 'B', 12)
pdf.cell(0, 6, 'B.Tech in Computer Science & Engineering', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
pdf.set_font('Helvetica', '', 11)
pdf.cell(0, 6, 'MITK', new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.output('/home/ranju/websiting/public/Indraj-Resume.pdf')
print("Resume generated successfully.")
