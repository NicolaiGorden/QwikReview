class Review < ApplicationRecord
    validates :title, presence: true

    validates :body, presence: true
    validates :body, length: { maximum: 280 }

    validates :score, numericality: { less_than_or_equal_to: 10, greater_than_or_equal_to: 1 }

    validates_uniqueness_of :user_id, scope: [:game_id], message: "already reviewed!"

    belongs_to :user
    belongs_to :game
end
