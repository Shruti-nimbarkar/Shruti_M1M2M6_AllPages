import api from "./api"

// Start new design request
export const startDesignRequest = async () => {
    const res = await api.post("/design-request/")
    return res.data   // { id, status }
}

// Save product details
export const saveDesignProductDetails = (id, data) =>
    api.post(`/design-request/${id}/product`, data)

// Save technical documents
export const saveDesignTechnicalDocuments = (id, data) =>
    api.post(`/design-request/${id}/documents`, data)

// Save design requirements
export const saveDesignRequirements = (id, data) =>
    api.post(`/design-request/${id}/requirements`, data)

// Save design standards
export const saveDesignStandards = (id, data) =>
    api.post(`/design-request/${id}/standards`, data)

// Save lab selection as draft
export const saveDesignLabSelectionDraft = (id, data) =>
    api.post(`/design-request/${id}/lab-selection/draft`, data)

// Submit request (labs)
export const submitDesignRequest = (id, data) =>
    api.post(`/design-request/${id}/submit`, data)

export const fetchFullDesignRequest = (id) =>
    api.get(`/design-request/${id}/full`).then(res => res.data)
