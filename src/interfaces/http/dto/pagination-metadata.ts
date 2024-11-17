export class PaginationMetadata {
  totalItems: number
  totalPages: number
  currentPage: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean

  constructor(totalItems: number, currentPage: number, itemsPerPage: number) {
    this.totalItems = totalItems
    this.itemsPerPage = itemsPerPage
    this.totalPages = Math.ceil(totalItems / itemsPerPage)
    this.currentPage =
      currentPage > this.totalPages ? this.totalPages : currentPage
    this.hasNextPage = this.currentPage < this.totalPages
    this.hasPreviousPage = this.currentPage > 1
  }

  getMetadata() {
    return {
      totalItems: this.totalItems,
      totalPages: this.totalPages,
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
      hasNextPage: this.hasNextPage,
      hasPreviousPage: this.hasPreviousPage,
    }
  }
}
