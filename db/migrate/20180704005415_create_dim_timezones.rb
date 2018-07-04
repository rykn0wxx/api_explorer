class CreateDimTimezones < ActiveRecord::Migration[5.2]
  def self.up
    create_table :dim_timezones do |t|
      t.string :timezone_name, limit: 50
      t.references :dim_region, foreign_key: true
      t.timestamps
    end
  end
  def self.down
    drop_table :dim_timezones
  end
end
