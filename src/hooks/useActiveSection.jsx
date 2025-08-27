import { useState, useEffect } from "react";

const useActiveSection = (sections) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = sections[0];

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
          else{
            currentSection = 'home';
          }
        }
      }

      if (activeSection !== currentSection) {
        setActiveSection(currentSection);

        // Update URL hash without reloading the page
        const newHash = `${currentSection}`;
        if (window.location.hash !== newHash) {
          window.history.replaceState(null, "", newHash);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to detect initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, activeSection]);

  return activeSection;
};

export default useActiveSection;