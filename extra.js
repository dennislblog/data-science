MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$']],
        processEscapes: true,
        processEnvironments: true,
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        TeX: {
            TagSide: "right",
            TagIndent: ".8em",
            MultLineWidth: "85%",
            equationNumbers: {
                autoNumber: "AMS",
            },
            unicode: {
                fonts: "STIXGeneral,'Arial Unicode MS'"
            },
            extensions: ["AMSmath.js", "AMSsymbols.js"]
        },
    },
    "HTML-CSS": {
        scale: 80,
        styles: {
            ".MathJax": { color: "#7d4104", }
        },
    },
    displayAlign: "center",
    showProcessingMessages: false,
    messageStyle: "none"
});