const a  = query.selectorAll("a");

a.array.forEach(link => {
    link.addEventListener("click", (e) => {
        
        e.preventDefault();

        console.log(link.href)
    })
    
});