class Profile < ApplicationRecord
    belongs_to :user

    # https://stackoverflow.com/questions/19292645/ruby-on-rails-creating-a-profile-when-user-is-created
end
