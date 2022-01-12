<script>
  export let content;

  const UN_LIST_TEMPL = line => `<li class="list-element">${line}</li>`;

  const O_LIST_TEMPL = line => `<li class="o-list-element">${line}</li>`;

  function marked(content) {
    let lines = content.split(/\\n|\\r/);

    let isUnList = false;
    let isOList = false;

    let inter = "";

    lines.forEach(line => {
      line = line.trim();
      ({ inter, isUnList, isOList } = resolveList(
        line,
        inter,
        isUnList,
        isOList
      ));

      if (line) {
        if (/^# .+/.test(line)) {
          inter += `<h2 class="heading-2 heading">${line}</h2>`;
        } else if (!(isOList || isUnList)) {
          inter += `<p class="paragraph">${line}</p>`;
        }
      } else {
        inter += "<br>";
      }
    });

    inter = inter.replaceAll(/- |\d\. |# /g, "");

    return inter;
  }

  function resolveList(line, inter, isUnList, isOList) {
    if (/^- .+/.test(line)) {
      if (isUnList) inter += UN_LIST_TEMPL(line);
      else {
        isUnList = true;
        inter += `<ul>${UN_LIST_TEMPL(line)}`;
      }
    } else if (/^\d\. .+/.test(line)) {
      if (isOList) inter += O_LIST_TEMPL(line);
      else {
        isOList = true;
        inter += `<ol>${O_LIST_TEMPL(line)}`;
      }
    } else if (isUnList) {
      inter += "</ul>";
      isUnList = false;
    } else if (isOList) {
      inter += "</ol>";
      isOList = false;
    }
    return { inter, isUnList, isOList };
  }
</script>

<div class="markup-container">
  {@html marked(content)}
</div>
