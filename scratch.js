const str = '<img src="test.png">';
const replaced = str.replace(/<img(?![^>]*loading=)/g, '<img loading="lazy"');
console.log(replaced);
