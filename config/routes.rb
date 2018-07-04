Rails.application.routes.draw do
  devise_for :users
  namespace :admin do
    resources :dim_regions
    resources :dim_timezones
    root :to => 'dim_regions#index'
  end
  get 'index' => 'explorer#index', :as => 'index'
  root :to => 'explorer#index'
end
