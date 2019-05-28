Rails.application.routes.draw do
  get 'home/index'

  root to: 'file_nodes#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :file_nodes
  post 'search', to: 'file_nodes#search'
end
