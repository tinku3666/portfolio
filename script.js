document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const skillsSection = document.querySelector(".skills-section");
    const skillCategories = document.querySelectorAll(".skill-category");
    const skills = document.querySelectorAll(".skill");

    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100 && !section.classList.contains("visible")) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
                section.classList.add("visible");
            }
        });
    }

    function revealSkills() {
        if (!skillsSection) return;
        const sectionTop = skillsSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100 && !skillsSection.classList.contains("visible")) {
            skillsSection.classList.add("visible");

            skillCategories.forEach((category, index) => {
                setTimeout(() => {
                    category.classList.add("show");
                }, index * 300);
            });
        }
    }

    function animateSkills() {
        if (!skills.length) return;
        
        gsap.to(skills, {
            opacity: 1,
            y: (index) => (Math.random() * 40 - 20), 
            x: (index) => (Math.random() * 50 - 25), 
            rotation: (index) => (Math.random() * 10 - 5), 
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.2
        });
    }

    window.addEventListener("scroll", () => {
        revealSections();
        revealSkills();
        animateSkills();
    });

    // Run once on page load
    revealSections();
    revealSkills();
    animateSkills();
});

document.querySelector(".contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  const response = await fetch("http://localhost:8000/contact", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.status === "success") {
    alert(result.message);
    this.reset();
  } else {
    alert("There was a problem. Please try again.");
  }
});

