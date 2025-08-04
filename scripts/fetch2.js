

  function loadSection(path, elementId) {
    fetch(path)
      .then(res => res.text())
      .then(html => {
        document.getElementById(elementId).innerHTML = html;
      })
      .catch(err => {
        document.getElementById(elementId).innerHTML = "কনটেন্ট লোড করতে সমস্যা হয়েছে!";
        console.error(err);
      });
  }

  loadSection("/keyboard-sortcut/key-sort.html", "key-section");
  loadSection("/oparator/oparator.html", "sort-section");
  loadSection("/islamic/islamic.html", "islamic-section");
  loadSection("/daily-use-tools/daily-use.html", "daily-section");
  loadSection("/dev-designer-tools/dev-design.html", "dev-section");
  loadSection("/educational-tools/edu.html", "edu-section");
  loadSection("/freelanching-tools/free.html", "free-section");
  loadSection("/dokan-tools/dokan.html", "dokan-section");
  loadSection("/money-tools/money.html", "money-section");
  loadSection("/media-tools/media.html", "media-section");
  loadSection("/bd-Localized-Special-tools/localized.html", "localized-section");
  loadSection("/tools-for-general-people/general.html", "general-section");

