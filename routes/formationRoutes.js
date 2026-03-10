// routes/formations.js
const express = require('express')
const router = express.Router()
const Formation = require('../models/Formation') // votre modèle mongoose

// GET /api/formations
router.get('/', async (req, res) => {
  const list = await Formation.find().sort({ createdAt: -1 })
  res.json(list)
})

// GET /api/formations/:id
router.get('/:id', async (req, res) => {
  const f = await Formation.findById(req.params.id)
  if (!f) return res.status(404).json({ message: 'Formation introuvable' })
  res.json(f)
})

// POST /api/formations
router.post('/', async (req, res) => {
  const { titre, description, duree, prix, image } = req.body
  if (!titre || !description || duree == null || prix == null) {
    return res.status(400).json({ message: 'Champs manquants' })
  }
  const formation = new Formation({ titre, description, duree, prix, image })
  await formation.save()
  res.status(201).json(formation)
})

// PUT /api/formations/:id
router.put('/:id', async (req, res) => {
  const upd = await Formation.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!upd) return res.status(404).json({ message: 'Formation introuvable' })
  res.json(upd)
})

// DELETE /api/formations/:id
router.delete('/:id', async (req, res) => {
  const d = await Formation.findByIdAndDelete(req.params.id)
  if (!d) return res.status(404).json({ message: 'Formation introuvable' })
  res.json({ message: 'Supprimé' })
})

module.exports = router