const str = '<img src="https://ik.imagekit.io/williamboylib/blog/building-a-search-engine-from-scratch/1791175501420-biz-google-524309146.webp" alt="img" title="img">';
console.log(str.replace(/<img(?![^>]*decoding=)/g, '<img decoding="async" style="min-height: 1px;"'));
