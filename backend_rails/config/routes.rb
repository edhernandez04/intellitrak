Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

get '/vehicles', to: 'vehicles#index'
post '/vehicles', to: 'vehicles#create'
get 'vehicles/:id', to: 'vehicles#show'

get '/users', to: 'users#index'

get '/clients', to: 'clients#index'
post '/clients', to: 'clients#create'

get '/leads', to: 'leads#index'
post '/leads', to: 'leads#create'

end
