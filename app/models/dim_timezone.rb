# == Schema Information
#
# Table name: dim_timezones
#
#  id            :integer          not null, primary key
#  timezone_name :string(50)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  dim_region_id :integer
#
# Indexes
#
#  index_dim_timezones_on_dim_region_id  (dim_region_id)
#

class DimTimezone < ApplicationRecord
  belongs_to :dim_region
end
