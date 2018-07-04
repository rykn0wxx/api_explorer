# == Schema Information
#
# Table name: dim_regions
#
#  id          :integer          not null, primary key
#  region_code :string(5)
#  region_name :string(20)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class DimRegion < ApplicationRecord
  has_many :dim_timezones
end
