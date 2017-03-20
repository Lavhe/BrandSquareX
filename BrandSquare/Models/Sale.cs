namespace BrandSquare.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Sale")]
    public partial class Sale
    {
        public int ID { get; set; }

        public int SellerID { get; set; }

        public int CategoryID { get; set; }

        [Column(TypeName = "text")]
        public string Image { get; set; }

        public int? Views { get; set; }

        public int? Price { get; set; }

        [StringLength(50)]
        public string Description { get; set; }

        public virtual Brand Brand { get; set; }

        public virtual Category Category { get; set; }
    }
}
