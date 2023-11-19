Rails.application.routes.draw do

  #USERS
  resources :users, only: [:index, :create, :show]
  
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
