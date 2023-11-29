class Profile < ApplicationRecord
    validate :acceptable_image
    validates :bio, length: { maximum: 300 }

    belongs_to :user
    has_one_attached :avatar

    def acceptable_image
        return unless avatar.attached?
    
        unless avatar.blob.byte_size <= 3.megabyte
          errors.add(:avatar, "is too large")
        end

        image_types = ["image/jpeg", "image/png"]
        unless image_types.include?(avatar.content_type)
            errors.add(:avatar, 'must be jpeg/png')
        end
    
    end
end
