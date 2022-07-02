const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("input[name=productId]").value;
  const csrfToken = btn.parentNode.querySelector("input[name=_csrf]").value;

  const productElement = btn.closest("article");

  fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: {
      "csrf-token": csrfToken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      productElement.remove();
    })
    .catch((err) => console.log(err));
};
