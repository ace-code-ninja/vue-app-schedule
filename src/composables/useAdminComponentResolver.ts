import { AdminComponentType } from '@/types/admin'
import TheAdminActive from '@/components/TheAdminActive.vue'
import TheAdminBoards from '@/components/TheAdminBoards.vue'
import TheAdminTable from '@/components/TheAdminTable.vue'

export const useAdminComponentResolver = (componentName: string) => {
  switch (componentName) {
    case AdminComponentType.active:
      return TheAdminActive
    case AdminComponentType.board:
      return TheAdminBoards
    case AdminComponentType.table:
      return TheAdminTable
    default:
      return TheAdminActive
  }
}
