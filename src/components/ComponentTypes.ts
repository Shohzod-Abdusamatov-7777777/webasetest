import WInput from 'src/components/Fields/WInput.vue'
import WOptionGroup from 'src/components/Fields/WOptionGroup.vue'
import WSelect from 'src/components/Fields/WSelect.vue'

export const COMPONENT_MAP = {
  text: WInput,
  textarea: WInput,
  radio: WOptionGroup,
  checkbox: WOptionGroup,
  select: WSelect,
};

export type COMPONENT_MAP_TYPES = keyof typeof COMPONENT_MAP

export function getComponent(type: COMPONENT_MAP_TYPES) {
  return COMPONENT_MAP[type];
}
