const trToEn = (query)=>{
    query = query.toLowerCase();
    const tr = "çğıöşüÇĞİÖŞÜ";
    const en = "cgioşuCGIOŞU";
    
    for (let i = 0; i < tr.length; i++) {
        query = query.replaceAll(tr[i], en[i]);
    }
    
    return query;
};