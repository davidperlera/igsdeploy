import { generateId } from "utils/EntityUtils"
import Entity from "models/Entity"

const MockEntity: Entity = {
  id: generateId(),
  created: new Date(),
  updated: new Date(),
}

export default MockEntity;