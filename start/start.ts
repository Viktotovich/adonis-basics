import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as phIcons } from '@iconify-json/ph'
import edge from 'edge.js'

addCollection(phIcons)

edge.use(edgeIconify)
