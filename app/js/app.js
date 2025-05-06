function generateDiamondText(size) {
    const isEven = size % 2 === 0;
    const height = isEven ? size + 1 : size;
    const lines = [];

    const maxStars = isEven ? size : size;
    const maxRowLength = (maxStars - 1) * 2 + 1;

    for (let y = 0; y < height; y++) {
        const isTopHalf = y <= Math.floor(height / 2);
        const level = isTopHalf ? y : height - 1 - y;

        let stars = isEven ? level * 2 : level * 2 + 1;
        if (stars < 1) stars = 1;

        let row = ``;
        for (let i = 0; i < stars; i++) {
            row += `*`;
            if (i < stars - 1) row += ` `;
        }

        const rowLength = row.length;
        const pad = Math.floor((maxRowLength - rowLength) / 2);
        lines.push(` `.repeat(pad) + row);
    }

    return lines.join(`\n`);
}

window.onload = () => {
    const size = parseInt(window.prompt(`Enter a number:`), 10);
    if (!Number.isInteger(size) || size < 1) return;

    const container = document.getElementById(`diamond-container`);
    container.innerHTML = ``;

    const pre = document.createElement(`pre`);
    pre.textContent = generateDiamondText(size);
    pre.style.margin = `0`;
    pre.style.padding = `5px`;
    pre.style.border = `1px solid black`;
    pre.style.fontFamily = `monospace`;
    pre.style.fontSize = `12px`;
    pre.style.lineHeight = `1`;
    pre.style.position = `absolute`;
    pre.style.top = `10px`;
    pre.style.left = `10px`;
    pre.style.overflow = `visible`;
    pre.style.display = `inline-block`;

    container.appendChild(pre);

    //  Left-right animation
    let direction = 1;
    let pos = 10;
    const speed = 7;
    let containerWidth = window.innerWidth;

    //  Update width on window resize
    window.addEventListener(`resize`, () => {
        containerWidth = window.innerWidth;
    });

    const animate = () => {
        const diamondWidth = pre.offsetWidth;

        if (pos + diamondWidth >= containerWidth || pos <= 0) {
            direction *= -1;
        }

        pos += direction * speed;
        pre.style.left = `${pos}px`;

        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
};
