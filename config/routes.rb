Rails.application.routes.draw do

  #SESSION
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  #USERS
  resources :users, only: [:index, :create, :show]

  #PROFILES
  resources :profiles, only: [:index, :create, :show]

  #GAMES
  resources :games, only: [:index, :create, :show, :destroy]

  #REVIEWS
  resources :reviews, only: [:index, :create, :show, :update, :destroy]

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
