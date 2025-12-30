# Design Request Module
from .routes import router
from .models import (
    DesignRequest,
    DesignProductDetails,
    DesignTechnicalDocument,
    DesignRequirements,
    DesignStandards,
    DesignLabSelection
)
from .services import (
    create_design_request,
    save_design_product_details,
    save_design_technical_documents,
    save_design_requirements,
    save_design_standards,
    save_design_lab_selection_draft,
    submit_design_request,
    get_full_design_request
)

__all__ = [
    "router",
    "DesignRequest",
    "DesignProductDetails",
    "DesignTechnicalDocument",
    "DesignRequirements",
    "DesignStandards",
    "DesignLabSelection",
    "create_design_request",
    "save_design_product_details",
    "save_design_technical_documents",
    "save_design_requirements",
    "save_design_standards",
    "save_design_lab_selection_draft",
    "submit_design_request",
    "get_full_design_request",
]
