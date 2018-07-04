source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.3.3'

gem 'rails', '~> 5.2.0'
gem 'puma', '~> 3.11'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'turbolinks', '~> 5.1', '>= 5.1.1'
gem 'therubyracer', platforms: :ruby
gem 'bcrypt', github: 'codahale/bcrypt-ruby', :require => 'bcrypt'
gem 'rack-cors'

group :production do
  gem 'pg'
end

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'annotate'
  gem 'sqlite3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'jquery-rails', '~> 4.3', '>= 4.3.3'
gem 'materialize-sass', '~> 1.0.0.rc2'
gem 'material_icons', '~> 2.2', '>= 2.2.1'
gem 'administrate', github: 'thoughtbot/administrate'
