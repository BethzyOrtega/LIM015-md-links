const totalAndUnique = (objLinks) => {
  const totalLinks = objLinks.map((item) => item.href).length;
  //   const linksUnique = objLinks.map((item) => item.href).reduce( (acum, item) => {
  //     if (acum.indexOf(item) < 0) {
  //       acum.push(item);
  //     }
  //     return acum;
  //   }, []);  
  const linksUnique = [...new Set(objLinks.map((item) => item.href))];
  return `Total: ${totalLinks}\nUnique: ${linksUnique.length}`;
};
  
const totalLinksBroken = (objLinks) => {
  const broken = objLinks.map((item) => item.message).filter(elem => elem === 'fail').length;
  return `Broken: ${broken}`;
};

module.exports = {
  totalAndUnique,
  totalLinksBroken
};
