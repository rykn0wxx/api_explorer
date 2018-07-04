require "administrate/base_dashboard"

class DimRegionDashboard < ApplicationDashboard

  ATTRIBUTE_TYPES = {
    id: Field::Number,
    region_name: Field::String,
    region_code: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  COLLECTION_ATTRIBUTES = [
    :region_name,
    :region_code,
    :created_at,
  ].freeze

  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys - READ_ONLY_ATTRIBUTES
  FORM_ATTRIBUTES = [
    :region_name,
    :region_code,
  ].freeze

  def display_resource(dim_region)
    "#{dim_region.region_name}"
  end
end
