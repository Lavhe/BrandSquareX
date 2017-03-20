namespace BrandSquare.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Event")]
    public partial class Event
    {
        public int ID { get; set; }

        [Required]
        [StringLength(100)]
        public string EventName { get; set; }

        public int EventHostID { get; set; }

        public int EventCategoryID { get; set; }

        public int? EventLocationID { get; set; }

        [StringLength(100)]
        public string EventPlace { get; set; }

        public int? EventDamage { get; set; }

        [StringLength(100)]
        public string EventDate { get; set; }

        [Column(TypeName = "text")]
        public string EventLineUp { get; set; }

        public virtual Brand Brand { get; set; }

        public virtual Category Category { get; set; }

        public virtual Location Location { get; set; }
    }
}
