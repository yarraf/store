const BASE_URL = '/produits'

export async function getProduits() {
  const res = await fetch(BASE_URL)
  return res.json()
}

export async function createProduit(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function updateProduit(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteProduit(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
}
